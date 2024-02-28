

/**
 * The function `recordExistsTest` is used to test if a spy function has been called with specific
 * arguments.
 * @param spy - A spy function that is used to track calls to recordExists function.
 */
function recordExistsTest(spy, {tableName, fieldName, value}) {
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(tableName, fieldName, value);
}

module.exports = recordExistsTest;