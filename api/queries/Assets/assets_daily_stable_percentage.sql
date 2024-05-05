WITH typed AS (
    SELECT
        date_trunc('day', block_timestamp) AS date,
        CASE
            WHEN (
                LOWER(symbol_out) LIKE '%usd%'
                OR LOWER(symbol_out) LIKE '%mim%'
                OR LOWER(symbol_out) LIKE '%dai%'
            ) THEN 'STABLE'
            ELSE 'VOLATILE'
        END AS type,
        CASE
            WHEN type = 'STABLE' THEN amount_out_usd
            ELSE 0
        END AS stable_volume,
        CASE
            WHEN type = 'VOLATILE' THEN amount_out_usd
            ELSE 0
        END AS volatile_volume
    FROM
        avalanche.defi.ez_dex_swaps
    WHERE
        date >= '2021-09-01'
        AND amount_out_usd IS NOT NULL
)
SELECT
    t.date,
    (
        SUM(t.stable_volume) /(
            SUM(t.stable_volume) + SUM(t.volatile_volume)
        )
    ) * 100 AS stable_percent
FROM
    typed t
GROUP BY
    t.date
ORDER BY
    t.date ASC