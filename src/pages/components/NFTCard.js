const NFTCard = ({ nft }) => {
  return (
    <>
      <div className="nft-card">
        <img src={nft.tokenURI} alt={nft.tokenId} />
        <div className="p-4">
          <p className="text-sm text-gray-500">Token ID: {nft.tokenId}</p>
        </div>
      </div>
    </>
  );
};

export default NFTCard;