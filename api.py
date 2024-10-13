from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import base64

app = Flask(__name__)
CORS(app)

# RDS database connection parameters
host = "hackathon-cluster-instance-1.cokoilr8io1s.us-east-1.rds.amazonaws.com"
port = 5432
database = "user-info"
user = "bobapark"
password = "WaddupGoat123"

def get_db_connection():
    return psycopg2.connect(
        host=host,
        port=port,
        database=database,
        user=user,
        password=password
    )

@app.route('/create_user', methods=['POST'])
def create_user():
    data = request.json
    image = base64.b64decode(data['image'])
    keywords = data['keywords']

    insert_data_sql = """
    INSERT INTO "real-user" (image, keywords) VALUES (%s, %s);
    """

    try:
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(insert_data_sql, (image, keywords))
                conn.commit()
        return jsonify({"message": "User created successfully"}), 201
    except psycopg2.Error as e:
        return jsonify({"error": str(e)}), 400

@app.route('/get_users', methods=['GET'])
def get_users():
    select_data_sql = "SELECT * FROM \"real-user\";"

    try:
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(select_data_sql)
                rows = cursor.fetchall()
                users = []
                for row in rows:
                    users.append({
                        "id": row[0],
                        "image": base64.b64encode(row[1]).decode('utf-8'),
                        "keywords": row[2]
                    })
        return jsonify(users), 200
    except psycopg2.Error as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)