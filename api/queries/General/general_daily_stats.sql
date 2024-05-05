WITH txs AS (
    SELECT
        min(date_trunc('day', block_timestamp)) AS date,
        tx_hash,
        min(origin_from_address) AS origin_from_address,
        min(amount_in_usd) AS amount_in_usd
    FROM
        avalanche.defi.ez_dex_swaps
    WHERE
        block_timestamp >= DATEADD('day', -365, GETDATE ())
    GROUP BY
        tx_hash
)
SELECT
    txs.date AS date,
    COUNT(DISTINCT txs.tx_hash) AS swaps,
    COUNT(DISTINCT txs.origin_from_address) AS users,
    SUM(txs.amount_in_usd) AS volume
FROM
    txs
GROUP BY
    txs.date
ORDER BY
    txs.date ASC