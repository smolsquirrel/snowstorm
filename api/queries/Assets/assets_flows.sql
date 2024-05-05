WITH top10 AS (
    SELECT
        symbol_out AS asset,
        SUM(amount_out_usd) AS volume
    FROM
        avalanche.defi.ez_dex_swaps
    WHERE
        block_timestamp >= DATEADD('day', -7, GETDATE ())
        AND amount_out_usd IS NOT NULL
    GROUP BY
        asset
    ORDER BY
        volume DESC
    LIMIT
        10
), tx AS (
    SELECT
        *
    FROM
        avalanche.defi.ez_dex_swaps
    WHERE
        block_timestamp >= DATEADD('day', -7, GETDATE ())
        AND amount_in_usd IS NOT NULL
        AND amount_out_usd IS NOT NULL
        AND symbol_out != symbol_in
),
flows AS (
    SELECT
        tx.symbol_in AS token_in,
        tx.symbol_out AS token_out,
        SUM(tx.amount_in_usd) AS volume_in,
        SUM(tx.amount_out_usd) AS volume_out
    FROM
        tx
    GROUP BY
        tx.symbol_in,
        tx.symbol_out
)
SELECT
    flows.*
FROM
    flows
    JOIN top10 ON flows.token_in = top10.asset
    JOIN top10 t10 ON flows.token_OUT = t10.asset
ORDER BY
    flows.token_in ASC,
    flows.token_out ASC