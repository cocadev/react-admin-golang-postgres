import { combineReducers } from "redux"

import auth from "./AuthReducer"
import user from "./UserReducer"
import agency from "./AgencyReducer"
import report from "./ReportReducer"
import hotel from "./HotelReducer"
import provider from "./ProviderReducer"
import activepropertylist from "./ActivepropertylistReducer"
import suppliermap from "./SuppliermapReducer"
import mapping from "./MappingReducer"

export default combineReducers({
    auth,
    user,
    agency,
    report,
    hotel,
    provider,
    activepropertylist,
    suppliermap,
    mapping
})
