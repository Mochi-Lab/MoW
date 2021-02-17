import { useSelector } from 'react-redux';
import ERC721Filter from 'Components/ERC721Filter';

export default function Home() {
  const { convertErc721Tokens, isLoadingErc721 } = useSelector((state) => state);
  return (
    <div style={{ width: '100%', height: '90vh' }}>
      <ERC721Filter erc721Tokens={convertErc721Tokens} isLoadingErc721={isLoadingErc721} />
    </div>
  );
}
