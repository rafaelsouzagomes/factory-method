import axios from "axios";
import { Crypto } from "./models/Crypto";
import { CryptoCoinClap } from "./models/CryptoCoinClap";
import { ICryptoManager } from "./interface/ICryptoManager";

export class CoinCapImpl extends ICryptoManager {
 
  protected api_descprition(): string {
    return "Coin Cap Api"
  }
  protected especificCode(): number {
    return 13992;
  }

  readonly API_URL_BASE: string= "https://api.coincap.io/v2/";

  async searchTop10Cryptos(): Promise<Crypto[]> {
    try {
      const response = await axios.get(this.API_URL_BASE+ 'assets');
      const data = response.data;
  
      const cryptos: CryptoCoinClap[] = data.data
                                            .filter((x:any)=>x.rank <=10)
                                            .map((element: any) => ({
                                                percent_change_24h: parseFloat(element.changePercent24Hr),
                                                id: element.id,
                                                name: element.name,
                                                price_usd: element.priceUsd,
                                                rank: element.rank,
                                            }));
      return cryptos;
    } catch (error) {
      console.error('Erro ao buscar os dados da API:', error);
      return []; 
    }
  }

}