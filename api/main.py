from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import query_manager
import requests
import requests
import helpers

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
)


# Homepage


# General Stats 1D
@app.get("/general/past_day")
async def general_past_day():
    r = requests.get(
        "https://api.flipsidecrypto.com/api/v2/queries/fc0bc5b2-a6b0-4448-babf-76deca1918e8/data/latest"
    )
    return {"data": r.json()}


# General Daily Stats
@app.get("/general/daily_stats")
async def general_daily_stats():
    r = requests.get(
        "https://api.flipsidecrypto.com/api/v2/queries/63402543-13b6-4901-82a3-5f1ba831be3e/data/latest"
    )
    return {"data": r.json()}


@app.get("/general/recent_transactions")
async def general_recent_transactions():
    return {"data": query_manager.gen_recent_txs()}


# Platform


# Platform general stats
@app.get("/platform/interval_stats")
async def platform_interval_stats():
    r = requests.get(
        "https://api.flipsidecrypto.com/api/v2/queries/c4a712cd-9e14-44e8-a380-13b8c1c51f12/data/latest"
    )
    return {"data": r.json()}


# Platform daily all time
# Platform daily 30D
# Platform daily 7D
@app.get("/platform/daily_line")
async def platform_daily_line():
    r1 = requests.get(
        "https://api.flipsidecrypto.com/api/v2/queries/cd0c326d-edbe-4d38-b135-be7a17a81b4f/data/latest"
    ).json()
    r2 = requests.get(
        "https://api.flipsidecrypto.com/api/v2/queries/f7de9ef6-a68e-43bd-9407-5d48249b28b8/data/latest"
    ).json()
    r3 = requests.get(
        "https://api.flipsidecrypto.com/api/v2/queries/dd9c5300-0f52-4bab-a33a-cca69ea90a56/data/latest"
    ).json()
    all_time = helpers.formatLineChart(r1, "PLATFORM")
    thirty = helpers.formatLineChart(r2, "PLATFORM")
    seven = helpers.formatLineChart(r3, "PLATFORM")
    return {"all_time": all_time, "thirty": thirty, "seven": seven}


# Platform daily all time
# Platform daily 30D
# Platform daily 7D
@app.get("/platform/daily_bump")
async def platform_daily_bump():
    r1 = requests.get(
        "https://api.flipsidecrypto.com/api/v2/queries/cd0c326d-edbe-4d38-b135-be7a17a81b4f/data/latest"
    ).json()
    r2 = requests.get(
        "https://api.flipsidecrypto.com/api/v2/queries/f7de9ef6-a68e-43bd-9407-5d48249b28b8/data/latest"
    ).json()
    r3 = requests.get(
        "https://api.flipsidecrypto.com/api/v2/queries/dd9c5300-0f52-4bab-a33a-cca69ea90a56/data/latest"
    ).json()
    all_time = helpers.formatBumpChart(r1, 60, "platform")
    thirty = helpers.formatBumpChart(r2, 3, "platform")
    seven = helpers.formatBumpChart(r3, 1, "platform")
    return {"all_time": all_time, "thirty": thirty, "seven": seven}


# Platform users 7D
@app.get("/platform/overlap")
async def platform_overlap():
    r = requests.get(
        "https://api.flipsidecrypto.com/api/v2/queries/8bbb10b6-c512-485d-b9e5-99321c7426a8/data/latest"
    )
    return {"data": helpers.platformUserOverlap(r.json())}


# Platform general stats
@app.get("/platform/pie")
async def platform_pie():
    r = requests.get(
        "https://api.flipsidecrypto.com/api/v2/queries/c4a712cd-9e14-44e8-a380-13b8c1c51f12/data/latest"
    )
    return helpers.platformPie(r.json())


# Asset


# Asset daily all time
# Asset daily 30D
# Asset daily 7D
@app.get("/asset/daily_line")
async def asset_daily_line():
    r1 = requests.get(
        "https://api.flipsidecrypto.com/api/v2/queries/59e5035d-206c-4626-9751-efa743e62290/data/latest"
    ).json()
    r2 = requests.get(
        "https://api.flipsidecrypto.com/api/v2/queries/763e0a93-d960-45e8-9d08-b39cbcd52c89/data/latest"
    ).json()
    r3 = requests.get(
        "https://api.flipsidecrypto.com/api/v2/queries/ac571dc6-c54f-4116-a44a-5bc57752153a/data/latest"
    ).json()
    all_time = helpers.formatLineChart(r1, "ASSET")
    thirty = helpers.formatLineChart(r2, "ASSET")
    seven = helpers.formatLineChart(r3, "ASSET")
    return {"all_time": all_time, "thirty": thirty, "seven": seven}


# Asset daily all time
# Asset daily 30D
# Asset daily 7D
@app.get("/asset/daily_bump")
async def asset_daily_bump():
    r1 = requests.get(
        "https://api.flipsidecrypto.com/api/v2/queries/59e5035d-206c-4626-9751-efa743e62290/data/latest"
    ).json()
    r2 = requests.get(
        "https://api.flipsidecrypto.com/api/v2/queries/763e0a93-d960-45e8-9d08-b39cbcd52c89/data/latest"
    ).json()
    r3 = requests.get(
        "https://api.flipsidecrypto.com/api/v2/queries/ac571dc6-c54f-4116-a44a-5bc57752153a/data/latest"
    ).json()
    all_time = helpers.formatBumpChart(r1, 60, "ASSET")
    thirty = helpers.formatBumpChart(r2, 3, "ASSET")
    seven = helpers.formatBumpChart(r3, 1, "ASSET")
    return {"all_time": all_time, "thirty": thirty, "seven": seven}


# Asset general stats
@app.get("/asset/pie")
async def platform_pie():
    r = requests.get(
        "https://api.flipsidecrypto.com/api/v2/queries/807a5e50-3cb1-41f4-871b-f892f576851f/data/latest"
    )
    return helpers.assetPie(r.json())


# Asset flows
@app.get("/asset/flows")
async def asset_flows():
    r = requests.get(
        "https://api.flipsidecrypto.com/api/v2/queries/9595dd35-485d-45d8-a27e-c12104e56b45/data/latest"
    )
    return {"data": helpers.assetChord(r.json())}


# Asset top gainers weekly
@app.get("/asset/heat_map")
async def asset_heat_map():
    r = requests.get(
        "https://api.flipsidecrypto.com/api/v2/queries/445117ed-fc2d-4f85-a5d5-bb5097ca94d8/data/latest"
    )
    return {"data": helpers.assetHeatMap(r.json())}


@app.get("/")
async def root():
    return {}
