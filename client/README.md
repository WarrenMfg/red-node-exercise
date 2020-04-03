<a name="module_API"></a>

## API
**Todo**

- [ ] Configure GET function as needed to interact with the server
- [ ] Configure POST function as needed to interact with the server
- [ ] Configure DELETE function as needed to interact with the server
- [ ] Modify DATA_PROPS as needed to interact with the server
- [ ] Modify ORDERS as needed to interact with the server


* [API](#module_API)
    * [~DATA_PROPS](#module_API..DATA_PROPS)
    * [~ORDERS](#module_API..ORDERS)
    * [~GET(sortBy, order)](#module_API..GET)
    * [~POST(record)](#module_API..POST)
    * [~DELETE(record)](#module_API..DELETE)

<a name="module_API..DATA_PROPS"></a>

### API~DATA\_PROPS
list of data object properties

**Kind**: inner constant of [<code>API</code>](#module_API)  
<a name="module_API..ORDERS"></a>

### API~ORDERS
list of possible order directions

**Kind**: inner constant of [<code>API</code>](#module_API)  
<a name="module_API..GET"></a>

### API~GET(sortBy, order)
GET function. It should get the data sorted by the provided key and order

**Kind**: inner method of [<code>API</code>](#module_API)  

| Param | Type |
| --- | --- |
| sortBy | <code>string</code> | 
| order | <code>string</code> | 

<a name="module_API..POST"></a>

### API~POST(record)
POST function. It should send a new record

**Kind**: inner method of [<code>API</code>](#module_API)  

| Param | Type |
| --- | --- |
| record | <code>object</code> | 

<a name="module_API..DELETE"></a>

### API~DELETE(record)
DELETE function. It should send a delete request

**Kind**: inner method of [<code>API</code>](#module_API)  

| Param | Type |
| --- | --- |
| record | <code>object</code> | 

