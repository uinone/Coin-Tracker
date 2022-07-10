import { useQuery } from "react-query";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import Chart from "./Chart";
import Price from "./Price";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0px;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface RounterState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

export interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const OverView = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.bgColor};
  padding: 20px;
  border-radius: 10px;
  font-weight: 100;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    &:first-child {
      text-transform: uppercase;
      font-size: 8px;
      margin-bottom: 8px;
    }
  }
`;

const Discription = styled.p`
  margin: 20px 0px;
  font-weight: 100;
  line-height: 1.5;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 400;
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 10px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.bgColor};
  a {
    display: block;
  }
`;

export const NavigationContainer = styled.div`
  display: flex;
  position: fixed;
  top: 30px;
  left: 30px;
`;

export const NavigationIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.cardBgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  svg {
    font-size: 22px;
    background-color: inherit;
    color: ${(props) => props.theme.bgColor};
  }
`;

function Coin() {
  const location = useLocation();
  const state = location.state as RounterState;
  const { coinId } = useParams();
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId!)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId!),
    {
      refetchInterval: 3000,
    }
  );

  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <NavigationContainer>
        <NavigationIcon>
          <Link to={"/"}>
            <FontAwesomeIcon icon={faHome} />
          </Link>
        </NavigationIcon>
      </NavigationContainer>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <OverView>
            <OverviewItem>
              <span>rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>

            <OverviewItem>
              <span>symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>

            <OverviewItem>
              <span>Price:</span>
              <span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </OverView>

          <Discription>{infoData?.description}</Discription>

          <OverView>
            <OverviewItem>
              <span>total suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>

            <OverviewItem>
              <span>max suply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </OverView>

          <Tabs>
            <Tab isActive={priceMatch ? true : false}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
            <Tab isActive={chartMatch ? true : false}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
          </Tabs>

          <Routes>
            <Route
              path={`price`}
              element={<Price tickersData={tickersData!} />}
            />
            <Route path={`chart`} element={<Chart coinId={coinId!} />} />
          </Routes>
        </>
      )}
    </Container>
  );
}

export default Coin;
