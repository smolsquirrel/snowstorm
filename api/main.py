from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import requests
import helpers

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Homepage


# General Stats 1D
@app.get("/general/past_day")
async def general_past_day():
    r = requests.get(
        "https://flipsidecrypto.xyz/api/v1/queries/04cbbd96-5b20-443e-adaa-1c6d345aab8c/data/latest"
    )
    return {"data": r.json()}


# General Daily Stats
@app.get("/general/daily_stats")
async def general_daily_stats():
    r = requests.get(
        "https://flipsidecrypto.xyz/api/v1/queries/baadf4a1-16de-4f32-80ad-00da8873c711/data/latest"
    )
    return {"data": r.json()}


@app.get("/general/recent_transactions")
async def general_recent_transactions():
    r = requests.get(
        "https://flipsidecrypto.xyz/api/v1/queries/90c16af0-cc2b-4530-bc3b-cf690bae5d4c/data/latest"
    )
    return {"data": r.json()}


# Platform
# Platform general stats
@app.get("/platform/interval_stats")
async def platform_interval_stats():
    r = requests.get(
        "https://flipsidecrypto.xyz/api/v1/queries/5de5caef-b020-497d-8a0f-e18ffbc2261c/data/latest"
    )
    return {"data": r.json()}


# Platform daily all time
# Platform daily 30D
# Platform daily 7D
@app.get("/platform/daily_line")
async def platform_daily_line():
    r1 = requests.get(
        "https://flipsidecrypto.xyz/api/v1/queries/bd0451ec-aae5-4929-9cda-c1ff84247476/data/latest"
    ).json()
    r2 = requests.get(
        "https://flipsidecrypto.xyz/api/v1/queries/5b4e3ae0-c96a-404b-a6b5-9161266cb5cf/data/latest"
    ).json()
    r3 = requests.get(
        "https://flipsidecrypto.xyz/api/v1/queries/c2117e80-0008-4b68-be30-6e2e74c3e136/data/latest"
    ).json()
    thirty = helpers.formatLineChart(r2, "PLATFORM")
    seven = helpers.formatLineChart(r3, "PLATFORM")
    return {"thirty": thirty, "seven": seven}


# Platform daily all time
# Platform daily 30D
# Platform daily 7D
@app.get("/platform/daily_bump")
async def platform_daily_bump():
    r2 = requests.get(
        "https://flipsidecrypto.xyz/api/v1/queries/5b4e3ae0-c96a-404b-a6b5-9161266cb5cf/data/latest"
    ).json()
    r3 = requests.get(
        "https://flipsidecrypto.xyz/api/v1/queries/c2117e80-0008-4b68-be30-6e2e74c3e136/data/latest"
    ).json()
    thirty = helpers.formatBumpChart(r2, 3, "platform")
    seven = helpers.formatBumpChart(r3, 1, "platform")
    return {"thirty": thirty, "seven": seven}


# Platform users 7D
@app.get("/platform/overlap")
async def platform_overlap():
    r = requests.get(
        "https://flipsidecrypto.xyz/api/v1/queries/492bfe19-7241-4015-adb2-5c4e3a71e087/data/latest"
    )
    return {"data": helpers.userOverlap(r.json(), "PLATFORM")}


# Platform general stats
@app.get("/platform/pie")
async def platform_pie():
    r = requests.get(
        "https://flipsidecrypto.xyz/api/v1/queries/5de5caef-b020-497d-8a0f-e18ffbc2261c/data/latest"
    )
    return helpers.platformPie(r.json())


# Asset


# Asset daily all time
# Asset daily 30D
# Asset daily 7D
@app.get("/asset/daily_line")
async def asset_daily_line():
    r2 = requests.get(
        "https://flipsidecrypto.xyz/api/v1/queries/c0be8ecb-1a80-40c9-875a-01b75e48991f/data/latest"
    ).json()
    r3 = requests.get(
        "https://flipsidecrypto.xyz/api/v1/queries/80dddc89-399b-4028-8ab1-bb50005fc95e/data/latest"
    ).json()
    thirty = helpers.formatLineChart(r2, "ASSET")
    seven = helpers.formatLineChart(r3, "ASSET")
    return {"thirty": thirty, "seven": seven}


# Asset daily all time
# Asset daily 30D
# Asset daily 7D
@app.get("/asset/daily_bump")
async def asset_daily_bump():
    r2 = requests.get(
        "https://flipsidecrypto.xyz/api/v1/queries/c0be8ecb-1a80-40c9-875a-01b75e48991f/data/latest"
    ).json()
    r3 = requests.get(
        "https://flipsidecrypto.xyz/api/v1/queries/80dddc89-399b-4028-8ab1-bb50005fc95e/data/latest"
    ).json()
    thirty = helpers.formatBumpChart(r2, 3, "ASSET")
    seven = helpers.formatBumpChart(r3, 1, "ASSET")
    return {"thirty": thirty, "seven": seven}


# Asset general stats
@app.get("/asset/pie")
async def pool_pie():
    r = requests.get(
        "https://flipsidecrypto.xyz/api/v1/queries/cba17139-5aee-44ee-b6df-539d9f880b8c/data/latest"
    )
    return helpers.pie(r.json(), "ASSET")


# Asset flows
@app.get("/asset/flows")
async def asset_flows():
    r = requests.get(
        "https://flipsidecrypto.xyz/api/v1/queries/b1c8dc27-0553-4799-a443-4ac219731631/data/latest"
    )
    return {"data": helpers.assetChord(r.json())}


# Asset top gainers weekly
@app.get("/asset/heat_map")
async def asset_heat_map():
    r = requests.get(
        "https://flipsidecrypto.xyz/api/v1/queries/c453b8d6-d0d4-4dc8-bc8c-a48c85855f23/data/latest"
    )
    return {"data": helpers.heatMap(r.json(), "ASSET")}


# Asset daily stable percent
@app.get("/asset/stable_line")
async def asset_stable_line():
    r = requests.get(
        "https://flipsidecrypto.xyz/api/v1/queries/9c8ce9cd-eda7-422d-b705-e39ac60455ac/data/latest"
    )
    data = r.json()
    d = []
    for x in data:
        d.append({"x": x["DATE"][:10], "y": x["STABLE_PERCENT"]})
    return {"data": d}


# Pools


# Pool daily all time
# Pool daily 30D
# Pool daily 7D
@app.get("/pool/daily_line")
async def pool_daily_line():
    r2 = requests.get(
        "https://flipsidecrypto.xyz/api/v1/queries/5f340d4e-2148-4a32-99e0-7e1c2c726920/data/latest"
    ).json()
    r3 = requests.get(
        "https://flipsidecrypto.xyz/api/v1/queries/201e3615-9653-40ea-9c3c-06c06d50529a/data/latest"
    ).json()
    thirty = helpers.formatLineChart(r2, "POOL")
    seven = helpers.formatLineChart(r3, "POOL")
    return {"thirty": thirty, "seven": seven}


# Pool daily all time
# Pool daily 30D
# Pool daily 7D
@app.get("/pool/daily_bump")
async def pool_daily_bump():
    r2 = requests.get(
        "https://flipsidecrypto.xyz/api/v1/queries/5f340d4e-2148-4a32-99e0-7e1c2c726920/data/latest"
    ).json()
    r3 = requests.get(
        "https://flipsidecrypto.xyz/api/v1/queries/201e3615-9653-40ea-9c3c-06c06d50529a/data/latest"
    ).json()
    thirty = helpers.formatBumpChart(r2, 3, "POOL")
    seven = helpers.formatBumpChart(r3, 1, "POOL")
    return {"thirty": thirty, "seven": seven}


# Pool general stats
@app.get("/pool/pie")
async def pool_pie():
    r = requests.get(
        "https://flipsidecrypto.xyz/api/v1/queries/4e1952b1-2ed9-402a-b5d8-6d3483ccb717/data/latest"
    )
    return helpers.pie(r.json(), "POOL")


# Pool users 7D
@app.get("/pool/overlap")
async def pool_overlap():
    r = requests.get(
        "https://flipsidecrypto.xyz/api/v1/queries/607bc526-66ff-46cb-ab5b-075d7b1970c5/data/latest"
    )
    return {"data": helpers.userOverlap(r.json(), "POOL")}


# Pool top gainers weekly
@app.get("/pool/heat_map")
async def pool_heat_map():
    r = requests.get(
        "https://flipsidecrypto.xyz/api/v1/queries/75510bc9-f601-42f5-a268-dd41b6276401/data/latest"
    )
    return {"data": helpers.heatMap(r.json(), "POOL")}


# Asset daily stable percent
@app.get("/pool/wavax_line")
async def pool_wavax_line():
    r = requests.get(
        "https://flipsidecrypto.xyz/api/v1/queries/7ee2765c-19a1-4c36-8433-499058f20455/data/latest"
    )
    data = r.json()
    d = []
    for x in data:
        d.append({"x": x["DATE"][:10], "y": x["WAVAX_PERCENT"]})
    return {"data": d}


@app.get("/")
async def root():
    return {}
