from fastapi import APIRouter

router = APIRouter()

@router.get("/test")
def test_customer():
    return {"message": "Customer routes working"}