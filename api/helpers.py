def formatPlatformDaily(data):
    chart = {}
    for x in data:
        if x["PLATFORM"] not in chart:
            chart[x["PLATFORM"]] = {"id": x["PLATFORM"], "data": []}
        chart[x["PLATFORM"]]["data"].append(
            {
                "SWAPS": x["SWAPS"],
                "VOLUME": x["VOLUME"],
                "USERS": x["USERS"],
                "DATE": x["DATE"],
            }
        )
    return list(chart.values())


def formatLineChart(data):
    lineData = {"USERS": [], "SWAPS": [], "VOLUME": []}
    volume = {}
    swaps = {}
    users = {}
    for x in data:
        if x["PLATFORM"] not in volume:
            volume[x["PLATFORM"]] = {"id": x["PLATFORM"], "data": []}
        if x["PLATFORM"] not in swaps:
            swaps[x["PLATFORM"]] = {"id": x["PLATFORM"], "data": []}
        if x["PLATFORM"] not in users:
            users[x["PLATFORM"]] = {"id": x["PLATFORM"], "data": []}

        volume[x["PLATFORM"]]["data"].append({"x": x["DATE"][:10], "y": x["VOLUME"]})
        swaps[x["PLATFORM"]]["data"].append({"x": x["DATE"][:10], "y": x["SWAPS"]})
        users[x["PLATFORM"]]["data"].append({"x": x["DATE"][:10], "y": x["USERS"]})
    lineData["VOLUME"] = list(volume.values())
    lineData["USERS"] = list(users.values())
    lineData["SWAPS"] = list(swaps.values())
    return lineData


def formatBumpChart(data, interval):
    lineData = {"USERS": [], "SWAPS": [], "VOLUME": []}
    volume = {}
    swaps = {}
    users = {}
    lv = []
    ls = []
    lu = []
    prev_date = data[0]["DATE"][:10]
    c = 0
    i = 0
    for x in data:
        if x["DATE"][:10] != prev_date:
            lv.sort(key=lambda x: x["value"], reverse=True)
            ls.sort(key=lambda x: x["value"], reverse=True)
            lu.sort(key=lambda x: x["value"], reverse=True)
            for i in range(len(lv)):
                if lv[i]["platform"] not in volume:
                    volume[lv[i]["platform"]] = {"id": lv[i]["platform"], "data": []}
                if ls[i]["platform"] not in swaps:
                    swaps[ls[i]["platform"]] = {"id": ls[i]["platform"], "data": []}
                if lu[i]["platform"] not in users:
                    users[lu[i]["platform"]] = {"id": lu[i]["platform"], "data": []}
                volume[lv[i]["platform"]]["data"].append({"x": prev_date, "y": i + 1})
                swaps[ls[i]["platform"]]["data"].append({"x": prev_date, "y": i + 1})
                users[lu[i]["platform"]]["data"].append({"x": prev_date, "y": i + 1})
            lv = []
            ls = []
            lu = []
            prev_date = x["DATE"][:10]
            c += 1
        if c % interval == 0:
            lv.append({"platform": x["PLATFORM"], "value": x["VOLUME"]})
            ls.append({"platform": x["PLATFORM"], "value": x["SWAPS"]})
            lu.append({"platform": x["PLATFORM"], "value": x["USERS"]})
    lineData["VOLUME"] = list(volume.values())
    lineData["USERS"] = list(users.values())
    lineData["SWAPS"] = list(swaps.values())
    return lineData


def platformUserOverlap(data):
    platforms = {}
    for x in data:
        if x["PLATFORM"] not in platforms:
            platforms[x["PLATFORM"]] = set()
        platforms[x["PLATFORM"]].add(x["USER"])

    platform_names = list(platforms.keys())
    overlap = []
    for p1 in platforms:
        values = []
        for p2 in platforms:
            if p1 == p2:
                values.append(0)
                continue
            common_users_count = len(platforms[p1].intersection(platforms[p2]))
            values.append(common_users_count)
        overlap.append(values)

    return {"labels": platform_names, "data": overlap}


def platformPie(data):
    pie = {}
    intervals = ["all_time", "thirty", "seven"]
    stats = ["SWAPS", "USERS", "VOLUME"]
    for interval in intervals:
        pie[interval] = {}
        for stat in stats:
            pie[interval][stat] = []
    print(pie)
    for z in data:
        for interval in intervals:
            x = interval.upper()
            for stat in stats:
                y = stat.upper()
                pie[interval][stat].append(
                    {
                        "id": z["PLATFORM"],
                        "label": z["PLATFORM"],
                        "value": z[f"{y}_{x}"],
                    }
                )
    return pie
