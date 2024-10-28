import pandas as pd

user_similarity_df = pd.read_pickle("D:\\Tailor AI Full Stack\\server\\data\\user_similarity_df.pkl")
user_item_matrix = pd.read_pickle("D:\\Tailor AI Full Stack\\server\\data\\user_item_matrix.pkl")

def recommend_product(user_id, k=4, n_recommendations=20):
    # Get the k most similar users to the target user
    similar_users = user_similarity_df[user_id].sort_values(ascending=False).index[1:k+1]
    
    # Get items that the similar users interacted with
    similar_users_items = user_item_matrix.loc[similar_users].sum(axis=0)
    
    # Remove items that the target user has already interacted with
    user_items = user_item_matrix.loc[user_id]
    recommendations = similar_users_items[user_items == 0].sort_values(ascending=False).head(n_recommendations)
    
    return recommendations.index.tolist()

