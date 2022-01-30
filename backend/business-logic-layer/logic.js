const dal = require("../data-access-layer/dal");
//const { Worker } = require("worker_threads");

function getAllCoordinatesAsync(env) {
  return dal.executeQueryAsync(
    `SELECT *, 
    ( SQRT( POWER(69.1 * (latitude - prev_latitude), 2)
     + POWER( 69.1 * (prev_longitude - longitude) * COS(latitude / 57.3), 2 ) ) )
      * 1.0 * 1609.344 AS distance_from_prev_point, MOD(vehicle_id, ?) +1 AS worker_id 
     FROM ( SELECT vehicle_id, row_id, longitude, latitude, 
        LAG(longitude) OVER ( PARTITION BY vehicle_id ORDER BY row_id ASC ) AS prev_longitude, 
        LAG(latitude) OVER ( PARTITION BY vehicle_id ORDER BY row_id ASC ) AS prev_latitude
        FROM coordinates_for_node_test ) t 
        ORDER BY vehicle_id, row_id;`,
    [env]
  );
}

module.exports = {
  getAllCoordinatesAsync,
};
