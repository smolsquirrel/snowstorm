from fastapi import FastAPI, Request, Response, status
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


@app.get("/general/past_day")
async def general_past_day():
    r = requests.get(
        "https://api.flipsidecrypto.com/api/v2/queries/fc0bc5b2-a6b0-4448-babf-76deca1918e8/data/latest"
    )
    return {"data": r.json()}


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
@app.get("/platform/interval_stats")
async def platform_interval_stats():
    r = requests.get(
        "https://api.flipsidecrypto.com/api/v2/queries/c4a712cd-9e14-44e8-a380-13b8c1c51f12/data/latest"
    )
    return {"data": r.json()}


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
    all_time = helpers.formatLineChart(r1)
    thirty = helpers.formatLineChart(r2)
    seven = helpers.formatLineChart(r3)
    return {"all_time": all_time, "thirty": thirty, "seven": seven}


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
    all_time = helpers.formatBumpChart(r1, 60)
    thirty = helpers.formatBumpChart(r2, 3)
    seven = helpers.formatBumpChart(r3, 1)
    return {"all_time": all_time, "thirty": thirty, "seven": seven}


@app.get("/platform/overlap")
async def platform_overlap():
    r = requests.get(
        "https://api.flipsidecrypto.com/api/v2/queries/8bbb10b6-c512-485d-b9e5-99321c7426a8/data/latest"
    )
    return {"data": helpers.platformUserOverlap(r.json())}


@app.get("/platform/pie")
async def platform_pie():
    r = requests.get(
        "https://api.flipsidecrypto.com/api/v2/queries/c4a712cd-9e14-44e8-a380-13b8c1c51f12/data/latest"
    )
    return helpers.platformPie(r.json())


@app.get("/")
async def root():
    return {}
