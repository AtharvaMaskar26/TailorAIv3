# # main.py
# from fastapi import FastAPI, HTTPException, Request
# from fastapi.middleware.cors import CORSMiddleware
# from utils import recommend_product
# import pandas as pd
# from fastapi.staticfiles import StaticFiles
# # from utils import find_image_from_path


# # Initialize the FastAPI app
# app = FastAPI()
# # Mount the static directory to serve files at '/static'
# app.mount("/static", StaticFiles(directory="static"), name="static")


# articles_df = pd.read_csv("D:\\Tailor AI Full Stack\\server\\data\\filtered_articles5k.csv")
# # Enable CORS for all domains, routes, and HTTP methods
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Allows all origins
#     allow_credentials=True,
#     allow_methods=["*"],  # Allows all methods
#     allow_headers=["*"],  # Allows all headers
# )

# # Route to retrieve images based on userID
# @app.get('/gallery')
# async def get_images(userId: str = None):
#     if not userId:
#         raise HTTPException(status_code=400, detail="userID is required")

#     # Example data retrieval, replace with actual logic
#     data = recommend_product(userId)
#     print(data)

#     results = []

#     print(articles_df.columns)
#     for article_id in data:
#         article_id_for_image = f"0{article_id}"
#         article_folder = str(article_id_for_image)[:3]
#         image_path = f"http://localhost:8000/static/images/{article_folder}/{article_id_for_image}.jpg"

#         product_name = articles_df[articles_df['article_id'] == article_id]['prod_name']
#         product_type_name = articles_df[articles_df['article_id'] == article_id]['product_type_name']
#         product_group_name = articles_df[articles_df['article_id'] == article_id]['product_group_name']
#         section_name = articles_df[articles_df['article_id'] == article_id]['section_name']
#         description = articles_df[articles_df['article_id'] == article_id]['detail_desc']

#         # print(articles_df[articles_df['article_id'] == article_id])

#         results.append({
#             "article_id": article_id, 
#             "image_path": image_path, 
#             "product_name": product_name, 
#             "product_type_name": product_type_name, 
#             "product_group_name": product_group_name, 
#             "section_name": section_name, 
#             "description": description
#         })
    
#     # Send the images back to the frontend
#     return results

# # Run the app
# # Run using `uvicorn main:app --reload` in the terminal


# main.py
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from utils import recommend_product, image_caption_and_embedding
import pandas as pd
import shutil
import os
# Initialize the FastAPI app
app = FastAPI()

# Mount the static directory to serve files at '/static'
app.mount("/static", StaticFiles(directory="static"), name="static")

# Load your articles DataFrame
articles_df = pd.read_csv("D:\\Tailor AI Full Stack\\server\\data\\filtered_articles5k.csv")

# Enable CORS for all domains, routes, and HTTP methods
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Route to retrieve images based on userID
@app.get('/gallery')
async def get_images(userId: str = None):
    if not userId:
        raise HTTPException(status_code=400, detail="userID is required")

    data = recommend_product(userId)
    results = []

    for article_id in data:
        article_id_for_image = f"0{article_id}"
        article_folder = str(article_id_for_image)[:3]
        image_path = f"http://localhost:8000/static/images/{article_folder}/{article_id_for_image}.jpg"

        product_name = articles_df[articles_df['article_id'] == article_id]['prod_name'].values[0]
        product_type_name = articles_df[articles_df['article_id'] == article_id]['product_type_name'].values[0]
        product_group_name = articles_df[articles_df['article_id'] == article_id]['product_group_name'].values[0]
        section_name = articles_df[articles_df['article_id'] == article_id]['section_name'].values[0]
        description = articles_df[articles_df['article_id'] == article_id]['detail_desc'].values[0]

        results.append({
            "article_id": article_id, 
            "image_path": image_path, 
            "product_name": product_name, 
            "product_type_name": product_type_name, 
            "product_group_name": product_group_name, 
            "section_name": section_name, 
            "description": description
        })
    
    return results

# New route to upload an image and get a caption
@app.post("/caption-image")
async def caption_image(file: UploadFile = File(...)):
    try:
        # Save the uploaded image temporarily
        temp_image_path = f"temp_{file.filename}"
        with open(temp_image_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Generate caption using the BLIP model
        caption = image_caption_and_embedding(temp_image_path)

        # Remove the temporary file
        os.remove(temp_image_path)

        # Return the generated caption
        return {"caption": caption}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run the app
# Run using `uvicorn main:app --reload` in the terminal
