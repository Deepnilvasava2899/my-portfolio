from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Deepnil Vasava Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    read: bool = False

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    message: str

class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Deepnil Vasava Portfolio API is running"}

@api_router.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow(),
        "service": "Portfolio API"
    }

# Contact form endpoint
@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(input: ContactMessageCreate):
    try:
        contact_dict = input.dict()
        contact_obj = ContactMessage(**contact_dict)
        
        # Insert into MongoDB
        result = await db.contact_messages.insert_one(contact_obj.dict())
        
        if result.inserted_id:
            logging.info(f"Contact message saved from {contact_obj.email}")
            return contact_obj
        else:
            raise HTTPException(status_code=500, detail="Failed to save contact message")
            
    except Exception as e:
        logging.error(f"Error saving contact message: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Get all contact messages (for portfolio owner)
@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages(limit: int = 50, skip: int = 0):
    try:
        messages = await db.contact_messages.find().sort("timestamp", -1).skip(skip).limit(limit).to_list(limit)
        return [ContactMessage(**message) for message in messages]
    except Exception as e:
        logging.error(f"Error fetching contact messages: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch messages")

# Mark message as read
@api_router.patch("/contact/{message_id}/read")
async def mark_message_read(message_id: str):
    try:
        result = await db.contact_messages.update_one(
            {"id": message_id},
            {"$set": {"read": True}}
        )
        if result.modified_count == 1:
            return {"message": "Message marked as read"}
        else:
            raise HTTPException(status_code=404, detail="Message not found")
    except Exception as e:
        logging.error(f"Error marking message as read: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update message")

# Portfolio stats endpoint
@api_router.get("/stats")
async def get_portfolio_stats():
    try:
        total_messages = await db.contact_messages.count_documents({})
        unread_messages = await db.contact_messages.count_documents({"read": False})
        
        return {
            "total_messages": total_messages,
            "unread_messages": unread_messages,
            "total_views": 0,  # Could be implemented with page view tracking
            "last_updated": datetime.utcnow()
        }
    except Exception as e:
        logging.error(f"Error fetching stats: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch stats")

# Legacy status check endpoints (keeping for compatibility)
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_db_client():
    logger.info("Portfolio API starting up...")
    logger.info(f"Connected to MongoDB at {mongo_url}")

@app.on_event("shutdown")
async def shutdown_db_client():
    logger.info("Portfolio API shutting down...")
    client.close()