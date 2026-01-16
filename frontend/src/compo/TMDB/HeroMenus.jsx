import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Card from "./Card";
import useApiStore from "./oth/store";

function HeroMenus() {
 const { type, keyVal } = useParams();
 const fetchGlobalAPI = useApiStore((s) => s.fetchGlobalAPI);
 const globalData = useApiStore((s) => s.globalData);

 const [page, setPage] = useState(1);

 useEffect(() => {
  setPage(1);
 }, [type, keyVal]);

 useEffect(() => {
  fetchGlobalAPI(type, keyVal, page);
 }, [page, type]);

 return (
  <>
   <Container>
    hello {type} , {keyVal}
    <Card
     movie={globalData.results}
     page={page}
     setPage={setPage}
     totalPages={globalData.total_pages}
     active={true}
    >
     hello
    </Card>
   </Container>
  </>
 );
}

export default HeroMenus;
