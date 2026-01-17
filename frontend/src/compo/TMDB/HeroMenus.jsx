import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Card from "./Card";
import useApiStore from "./oth/store";
import PersonCard from "./PersonCard";
import LeftNav from "./navbar component/LeftNav";

function HeroMenus() {
 const { type, keyVal } = useParams();
 const fetchGlobalAPI = useApiStore((s) => s.fetchGlobalAPI);
 const globalData = useApiStore((s) => s.globalData);
 const isLoading = useApiStore((s) => s.isLoading);

 const [page, setPage] = useState(1);
 if (!type) return;

 useEffect(() => {
  setPage(1);
 }, [type, keyVal]);

 useEffect(() => {
  fetchGlobalAPI(type, keyVal, page);
 }, [page, type]);

 if (isLoading)
  return (
   <div className="font-bold text-2xl text-center animate-pulse mt-12">
    Loading ...
   </div>
  );

 return (
  <>
   <Container>
    {type && type != "person" ? (
     <>
      <Box sx={{ display: "flex" }}>
       <Box sx={{ position: "sticky", top: 0 }}>
        <LeftNav />
       </Box>
       <Card
        movie={globalData.results}
        page={page}
        setPage={setPage}
        totalPages={globalData.total_pages}
        active={true}
       ></Card>
      </Box>
     </>
    ) : (
     <PersonCard
      page={page}
      person={globalData.results}
      setPage={setPage}
      totalPages={globalData.total_pages}
      active={true}
     >
      hello
     </PersonCard>
    )}
   </Container>
  </>
 );
}

export default HeroMenus;
