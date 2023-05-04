def formatLineChart(data, key):
    lineData = {"USERS": [], "SWAPS": [], "VOLUME": []}
    volume = {}
    swaps = {}
    users = {}
    for x in data:
        if x[key] not in volume:
            volume[x[key]] = {"id": x[key], "data": []}
        if x[key] not in swaps:
            swaps[x[key]] = {"id": x[key], "data": []}
        if x[key] not in users:
            users[x[key]] = {"id": x[key], "data": []}

        volume[x[key]]["data"].append({"x": x["DATE"][:10], "y": x["VOLUME"]})
        swaps[x[key]]["data"].append({"x": x["DATE"][:10], "y": x["SWAPS"]})
        users[x[key]]["data"].append({"x": x["DATE"][:10], "y": x["USERS"]})
    lineData["VOLUME"] = list(volume.values())
    lineData["USERS"] = list(users.values())
    lineData["SWAPS"] = list(swaps.values())
    return lineData


def formatBumpChart(data, interval, key):
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
                if lv[i][key] not in volume:
                    volume[lv[i][key]] = {"id": lv[i][key], "data": []}
                if ls[i][key] not in swaps:
                    swaps[ls[i][key]] = {"id": ls[i][key], "data": []}
                if lu[i][key] not in users:
                    users[lu[i][key]] = {"id": lu[i][key], "data": []}
                volume[lv[i][key]]["data"].append({"x": prev_date, "y": i + 1})
                swaps[ls[i][key]]["data"].append({"x": prev_date, "y": i + 1})
                users[lu[i][key]]["data"].append({"x": prev_date, "y": i + 1})
            lv = []
            ls = []
            lu = []
            prev_date = x["DATE"][:10]
            c += 1
        if c % interval == 0:
            lv.append({key: x[key.upper()], "value": x["VOLUME"]})
            ls.append({key: x[key.upper()], "value": x["SWAPS"]})
            lu.append({key: x[key.upper()], "value": x["USERS"]})
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


def assetPie(data):
    pie = {}
    intervals = ["all_time", "thirty", "seven"]
    stats = ["SWAPS", "USERS", "VOLUME"]
    for interval in intervals:
        pie[interval] = {}
        for stat in stats:
            pie[interval][stat] = []

    for i in range(3):
        interval = intervals[i]
        d = data[i * 10 : (i + 1) * 10]
        for stat in stats:
            for x in d:
                pie[interval][stat].append(
                    {
                        "id": x["ASSET"],
                        "label": x["ASSET"],
                        "value": x[stat],
                    }
                )

    return pie


def assetChord(data):
    assets = set()
    for x in data:
        assets.add(x["TOKEN_IN"])
    d = data
    i = 0
    flows = []
    assets = sorted(list(assets))
    for x in assets:
        xl = []
        for y in assets:
            if i >= len(d):
                xl.append(0)
                continue
            cur = d[i]
            if cur["TOKEN_IN"] == x and cur["TOKEN_OUT"] == y:
                i += 1
                xl.append(cur["VOLUME_IN"])
            else:
                xl.append(0)
        flows.append(xl)
    return {"labels": assets, "data": flows}
