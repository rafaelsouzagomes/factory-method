import axios from "axios";
import { Crypto } from "./models/Crypto";
import { ICryptoManager } from "./interface/ICryptoManager";
import { CryptoCoinClor } from "./models/CryptoCoinClor";

export class CoinCloreApiImpl extends ICryptoManager {
  
  protected api_descprition(): string {
    return "Coin CLore Api";
  }
  
  protected especificCode(): number {
   return 14003;
  }

  readonly API_URL_BASE: string= "https://api.coinlore.net/api/";

  async searchTop10Cryptos(): Promise<Crypto[]> {
    try {
      const response = await axios.get(this.API_URL_BASE+ 'tickers');
      const data = response.data;
      const cryptos: CryptoCoinClor[] = data.data
                                            .filter((x:any)=>x.rank <=10)
                                            .map((element: any) => ({
                                                id: element.id,
                                                name: element.name,
                                                percent_change_24h: parseFloat(element.percent_change_24h),
                                                price_usd: element.price_usd,
                                                rank: element.rank,
                                            }));
      return cryptos;
    } catch (error) {
      console.error('Erro ao buscar os dados da API:', error);
      return []; 
    }
  }
}