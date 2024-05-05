WITH base AS (
    SELECT
        date_trunc('day', block_timestamp) AS date,
        pool_name,
        tx_hash,
        origin_from_address,
        amount_in_usd
    FROM
        avalanche.defi.ez_dex_swaps
    WHERE
        date >= '2021-04-27'
        AND amount_in_usd IS NOT NULL
),
thirty AS (
    SELECT
        1 AS index,
        pool_name AS pool,
        COUNT(DISTINCT tx_hash) AS swaps_thirty,
        COUNT(DISTINCT origin_from_address) AS users_thirty,
        SUM(amount_in_usd) AS volume_thirty
    FROM
        base
    WHERE
        base.date >= DATEADD('day', -30, GETDATE ())
    GROUP BY
        pool_name
    ORDER BY
        volume_thirty DESC
    LIMIT
        10
), seven AS (
    SELECT
        2 AS index,
        pool_name AS pool,
        COUNT(DISTINCT tx_hash) AS swaps_seven,
        COUNT(DISTINCT origin_from_address) AS users_seven,
        SUM(amount_in_usd) AS volume_seven
    FROM
        base
    WHERE
        base.date >= DATEADD('day', -7, GETDATE ())
    GROUP BY
        pool_name
    ORDER BY
        volume_seven DESC
    LIMIT
        10
), all_time AS (
    SELECT
        0 AS index,
        pool_name AS pool,
        COUNT(DISTINCT tx_hash) AS swaps,
        COUNT(DISTINCT origin_from_address) AS users,
        SUM(amount_in_usd) AS volume
    FROM
        base
    GROUP BY
        pool_name
    ORDER BY
        volume DESC
    LIMIT
        10
)
SELECT
    *
FROM
    all_time
UNION
SELECT
    *
FROM
    thirty
UNION
SELECT
    *
FROM
    seven
ORDER BY
    index ASC