import ArtikelList from "../artikel/layouts/SectionLIstArtikel";
import CTAarticle from "../artikel/layouts/SectionCTAarticle";
import { useEffect } from "react";
import LayoutUser from "../layout";

function ListArticle() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LayoutUser>
      <CTAarticle />
      <ArtikelList />
    </LayoutUser>
  );
}

export default ListArticle;
