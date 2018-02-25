import { observable } from 'mobx';
import Strings from '../constants/Strings';

const GET_LIST_URL = Strings.baseUrl + '/5a7f23442e00005000b56873';
const GET_PRICES_URL = Strings.baseUrl + '/5a7f24f02e00005200b56875';
const GET_HOTEL_DETAILS_URL = Strings.baseUrl + '/5a7f265b2e00005d00b56877';

export default class HotelStore {
  @observable hotels = {};
  @observable prices = {};
  @observable hotel = {};

  async fetchHotels() {
    let status;

    try {
      let response = await fetch(GET_LIST_URL, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      status = response.status;
      const res = await response.json();

      //Convert to Map for easy access eventually
      this.hotels = res.data.reduce((obj, item) => {
        obj[item['id']] = item;
        return obj;
      }, {});
    } catch (e) {
      console.warn(e.message);
    }

    return status;
  }

  async fetchHotelPrices() {
    let status;

    try {
      let response = await fetch(GET_PRICES_URL, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      status = response.status;
      const res = await response.json();

      //Convert to Map for easy access eventually
      this.hotels = res.data.reduce((obj, item) => {
        obj[item['id']] = item;
        return obj;
      }, {});
    } catch (e) {
      console.warn(e.message);
    }

    return status;
  }

  async fetchHotelDetails() {
    let status;

    try {
      let response = await fetch(GET_HOTEL_DETAILS_URL, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      status = response.status;
      const res = await response.json();

      //Convert to Map for easy access eventually
      this.hotels = res.data.reduce((obj, item) => {
        obj[item['id']] = item;
        return obj;
      }, {});
    } catch (e) {
      console.warn(e.message);
    }

    return status;
  }
}
