function get_request(context) {
    if (context && context.request)
        return context.request.rawRequest;
    return {}
}

function get_selected_item(request){
    if (request &&
        request.payload &&
        request.payload.meta &&
        request.payload.meta.current_app &&
        request.payload.meta.current_app.state){
        return request.payload.selected_item;
    }
    return null;
}

function get_items(request){
    if (request &&
        request.payload &&
        request.payload.meta &&
        request.payload.meta.current_app &&
        request.payload.meta.current_app.state &&
        request.payload.meta.current_app.state.item_selector){
        return request.payload.meta.current_app.state.item_selector.items;
    }
    return null;
}

function get_id_by_selected_item(request){
    var items = get_items(request);
    var selected_item = get_selected_item(request);
    if (selected_item && items) {
        if (items[selected_item.index]) {
            return items[selected_item.index].id
        }
    }
    return null;
}
