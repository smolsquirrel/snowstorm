from shroomdk import ShroomDK
import queries
from dotenv import load_dotenv

load_dotenv()
import os

sdk = ShroomDK(os.environ.get("API_KEY"))


def execute(query, args):
    return sdk.query(query.format(*args)).records


def top_platforms(delta):
    result = execute(queries.top_platforms, [delta])
    volume = sorted(result, key=lambda x: x["usd"])[-1]
    activity = sorted(result, key=lambda x: x["tx_count"])[-1]
    users = sorted(result, key=lambda x: x["users"])[-1]

    return {
        "volume": volume,
        "activity": activity,
        "users": users,
    }


def gen_recent_txs():
    return execute(queries.general_recent_transactions, [])
