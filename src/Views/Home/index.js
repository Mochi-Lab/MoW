import { useSelector } from 'react-redux';
import ERC721Filter from 'Components/ERC721Filter';
import './index.css';

export default function Home() {
  const { convertErc721Tokens, isLoadingErc721 } = useSelector((state) => state);
  return (
    <div className='content-home '>
      <ERC721Filter erc721Tokens={convertErc721Tokens} isLoadingErc721={isLoadingErc721} />
    </div>
  );
}
