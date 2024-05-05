WITH base AS (
    SELECT
        date_trunc('day', block_timestamp) AS date,
        platform,
        tx_hash,
        origin_from_address,
        amount_in_usd
    FROM
        avalanche.defi.ez_dex_swaps
),
thirty AS (
    SELECT
        platform,
        COUNT(DISTINCT tx_hash) AS swaps_thirty,
        COUNT(DISTINCT origin_from_address) AS users_thirty,
        SUM(amount_in_usd) AS volume_thirty
    FROM
        base
    WHERE
        base.date >= DATEADD('day', -30, GETDATE ())
    GROUP BY
        platform
),
seven AS (
    SELECT
        platform,
        COUNT(DISTINCT tx_hash) AS swaps_seven,
        COUNT(DISTINCT origin_from_address) AS users_seven,
        SUM(amount_in_usd) AS volume_seven
    FROM
        base
    WHERE
        base.date >= DATEADD('day', -7, GETDATE ())
    GROUP BY
        platform
),
all_time AS (
    SELECT
        platform,
        COUNT(DISTINCT tx_hash) AS swaps_all_time,
        COUNT(DISTINCT origin_from_address) AS users_all_time,
        SUM(amount_in_usd) AS volume_all_time
    FROM
        base
    GROUP BY
        platform
)
SELECT
    *
FROM
    thirty
    JOIN seven ON thirty.platform = seven.platform
    JOIN all_time ON thirty.platform = all_time.platform