/**
 * All data end-points are exported here
 * -> Make it easy to change between solutions
*/

import DataStore from './dataStore';


/**
 * Singleton
 * Change the initiation to new .. to change to another solution
 */
export default connector = new DataStore();
