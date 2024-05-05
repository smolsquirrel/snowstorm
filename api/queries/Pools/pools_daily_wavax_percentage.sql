WITH typed AS (
    SELECT
        date_trunc('day', block_timestamp) AS date,
        CASE
            WHEN (LOWER(pool_name) LIKE '%wavax%') THEN 'wavax'
            ELSE 'other'
        END AS type,
        CASE
            WHEN type = 'wavax' THEN amount_in_usd
            ELSE 0
        END AS wavax_volume,
        CASE
            WHEN type = 'other' THEN amount_in_usd
            ELSE 0
        END AS other_volume
    FROM
        avalanche.defi.ez_dex_swaps
    WHERE
        date >= '2021-09-01'
        AND amount_in_usd IS NOT NULL
)
SELECT
    t.date,
    (
        SUM(t.wavax_volume) /(
            SUM(t.wavax_volume) + SUM(t.other_volume)
        )
    ) * 100 AS wavax_percent
FROM
    typed t
GROUP BY
    t.date
ORDER BY
    t.date ASC