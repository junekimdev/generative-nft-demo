import { useEffect } from 'react';
// import Script from 'next/script';
import Meta from '../components/meta';
import MainFrame from '../components/mainFrame';
import TopBar from '../components/topbar';
import Gallery from '../components/gallery';

const Page = () => {
  const publicUrl = process.env.PUBLIC_URL || 'localhost:3000';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Meta title="JKT NFT Gallery" desc="June Kim's First NFT" url={publicUrl}></Meta>
      <MainFrame>
        <TopBar />
        <Gallery />
      </MainFrame>
    </>
  );
};

export default Page;
