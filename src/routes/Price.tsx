import styled from "styled-components";
import { PriceData } from "./Coin";

const PriceInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const PriceInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
  padding: 30px 20px;
  border-radius: 5px;
  color: ${(props) => props.theme.bgColor};
  span {
    &:first-child {
      text-transform: uppercase;
      font-weight: 600;
      color: ${(props) => props.theme.accentColor};
    }
    &:nth-child(2) {
      font-size: 11px;
      margin-top: 5px;
      margin-bottom: 20px;
    }
    &:last-child {
      font-size: 30px;
    }
  }
`;

function Price({ tickersData }: { tickersData: PriceData }) {
  return (
    <PriceInfoContainer>
      <PriceInfo>
        <span>percent change</span>
        <span>[1 year]</span>
        <span>{tickersData.quotes.USD.percent_change_1y}</span>
      </PriceInfo>

      <PriceInfo>
        <span>percent change</span>
        <span>[30 days]</span>
        <span>{tickersData.quotes.USD.percent_change_30d}</span>
      </PriceInfo>

      <PriceInfo>
        <span>percent change</span>
        <span>[24 hour]</span>
        <span>{tickersData.quotes.USD.percent_change_24h}</span>
      </PriceInfo>

      <PriceInfo>
        <span>percent change</span>
        <span>[12 hour]</span>
        <span>{tickersData.quotes.USD.percent_change_12h}</span>
      </PriceInfo>

      <PriceInfo>
        <span>percent change</span>
        <span>[6 hour]</span>
        <span>{tickersData.quotes.USD.percent_change_6h}</span>
      </PriceInfo>

      <PriceInfo>
        <span>percent change</span>
        <span>[1 hour]</span>
        <span>{tickersData.quotes.USD.percent_change_1h}</span>
      </PriceInfo>

      <PriceInfo>
        <span>percent change</span>
        <span>[30 min]</span>
        <span>{tickersData.quotes.USD.percent_change_30m}</span>
      </PriceInfo>

      <PriceInfo>
        <span>percent change</span>
        <span>[15 min]</span>
        <span>{tickersData.quotes.USD.percent_change_15m}</span>
      </PriceInfo>
    </PriceInfoContainer>
  );
}

export default Price;
