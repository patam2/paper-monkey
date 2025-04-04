from fastapi import APIRouter


router = APIRouter()

@router.get("/newspaper")
async def get_newspaper():
    return {"message": "Newspaper data"}