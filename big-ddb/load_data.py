from decimal import Decimal
import json
import boto3


def load_movies(movies, dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb')

    table = dynamodb.Table('big-user-table1')
    i = 1
    for movie in movies:
        year = str(movie['year'])
        title = movie['title']

        table.put_item(Item={
            'PK': year,
            'SK': title,
            'info': movie['info']
        })
        print(i, ". Added movie:", year, title)
        i = i+1


if __name__ == '__main__':
    with open("./big-ddb/movies.json") as json_file:
        movie_list = json.load(json_file, parse_float=Decimal)
    load_movies(movie_list)
