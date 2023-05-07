// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Game01Contract {
    // Mapping to store the timestamp associated with each token ID
    mapping(uint256 => uint256) private tokenTimestamps;

    // Records the timestamp for a given token ID
    function recordTimestamp(uint256 tokenId, uint256 enteredTimestamp) public {
        // Ensure the entered timestamp is valid (greater than 0)
        require(enteredTimestamp > 0, "Invalid timestamp-ZERO");

        // If a timestamp has been previously recorded for this token ID,
        // ensure that the new timestamp is smaller than the previous one
        if (tokenTimestamps[tokenId] != 0) {
            require(enteredTimestamp < tokenTimestamps[tokenId], "Invalid timestamp-LARGER");
        }

        // Update the timestamp for the given token ID
        tokenTimestamps[tokenId] = enteredTimestamp;
    }

    // Retrieves the timestamp associated with a given token ID
    function getTimestamp(uint256 tokenId) public view returns (uint256) {
        // Ensure the requested token ID has a valid timestamp (greater than 0)
        require(tokenTimestamps[tokenId] > 0, "Invalid timestamp-ZERO");

        // Return the timestamp associated with the token ID
        return tokenTimestamps[tokenId];
    }
}
