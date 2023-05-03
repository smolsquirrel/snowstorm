from shroomdk import ShroomDK
import queries

sdk = ShroomDK("a6eea43b-7f22-445f-9d00-53fe76a7d4cf")


def execute(query, args):
    return sdk.query(query.format(*args), cached=False).records


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
