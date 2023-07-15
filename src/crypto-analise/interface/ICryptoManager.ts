import { Crypto } from "../models/Crypto";
import { Report } from "../models/Report";

export abstract class ICryptoManager {
  protected abstract searchTop10Cryptos(): Promise<Crypto[]>;

  protected abstract api_descprition(): string;

  protected abstract especificCode(): number;
  
   public async createReport(): Promise<Report> {

    const criptoinfos: Crypto[] = await this.searchTop10Cryptos();
    const total: number = criptoinfos.length;
    let sum: number = 0;
    criptoinfos.forEach((crypto)=> {
      sum += crypto.percent_change_24h
    });
    const changePercent24HrAverage:number = sum/total;
    return {  apiName: this.api_descprition(),
              changePercent24HrAverage:changePercent24HrAverage };
  }
}