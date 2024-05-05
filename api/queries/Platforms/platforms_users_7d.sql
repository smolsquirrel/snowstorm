SELECT
    platform,
    origin_from_address AS user
FROM
    avalanche.defi.ez_dex_swaps
WHERE
    date_trunc('day', block_timestamp) >= DATEADD('day', -7, GETDATE ())
GROUP BY
    platform,
    user
ORDER BY
    platform ASC