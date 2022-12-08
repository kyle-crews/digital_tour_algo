/**
 * Picks a random CCC token ID based on its weekly handicap boosters.
 * The Token IDs with higher handicap boosters will be picked more often (with a higher probability).
 *
 * For example:
 * - ids = ['1', '200', '85', '99', '1245']
 * - boosters = [0.01, 0.2, 0.4, 0.01, 0.1]
 * - weightedRandom(ids, boosters) in 40% of cases will select the id of '85', 20% of cases will select
 * '200', and 1% of the time will return '1245' or '99' or '1'. Token IDs without a weekly handicap booster have a 1% chance of selection, by default.
 */

/**
 * The ids and booster % arrays are populated from the database of entered CCC Token IDs. Duplicate values are removed. Below are example sets, for reference. Boosters % are calucalated as a sum
 * value of the weekly handicap boosters associated with the entered CCC NFT. For example, if CCC ID #41 has 3 of the weekly handicap boosters ... the boosters value
 * assocaited with this ID would be .3 (or 30%). Metadata for entered IDs are pulled into a database and a query is performed to determine how many weekly handicap boosters
 * each token ID has.
*/

 ids = ['1', '200', '85', '99', '1245']
 boosters = [0.01, 0.2, 0.4, 0.01, 0.1]
 selections = []
 
// Returns errors is ids + boosters arrays are not the same length

function weightedRandom(items, weights) {
    if (ids.length !== boosters.length) {
      throw new Error('IDs and boosters must be of the same size');
    }
    
// Returns an error if ids array is empty
  
    if (!ids.length) {
      throw new Error('IDs must not be empty');
    }
  
// Preparing the cumulative boosters array.

    const cumulativeBoosters = [];
    for (let i = 0; i < boosters.length; i += 1) {
      cumulativeBoosters[i] = boosters[i] + (cumulativeBoosters[i - 1] || 0);
    }
  
// Getting the random number in a range of [0...sum(boosters)]
// For example:
// - weights = [1, 5, 3]
// - maxCumulativeBoosters = 9
// - range for the random number is [0...9]

    const maxCumulativeBoosters = cumulativeBoosters[cumulativeBoosters.length - 1];
    const randomNumber = maxCumulativeBoosters * Math.random();
  
// Picking the random ids based on its boosters %.
// The ids with more handicap boosters will be more likely to be selected.

    for (let idIndex = 0; idIndex < ids.length; idIndex += 1) {
        if (cumulativeBoosters[idIndex] >= randomNumber) {
          return {
            token: ids[idIndex],
          };
        }
    }
}

selections.push(weightedRandom(ids, boosters));


/**
 * Once a Token ID is selected, the ID is added the the selections array of IDs that will make the cut. Next, the selected ID and associated boosters string value
 * is removed from the ids and boosters arrays. This process is run in a loop until the total number of IDs for each round is met. Total IDs in a round are selected
 * based on the following:
 *  
 *  Round 1: All entered IDs (example: 400)
 *  Round 2: Total IDs cut by 50% (example: 200)
 *  Round 3: Total IDs cut by 50% (example: 100)
 *  Round 4: Total IDs cut to 20
*/
