const clientID = 'ufYr6HthwR4AX';
const apiKey = 'V4rZej2x3qCkYB213POfPAi0hugqOigDQj3WbtPh2yZCIf4zci-b0MnffHI1SwNdiGtjY6FzbBcmI3xExIzKSw-Yo84o3Yr6to2MHXftmTC3BUMA77UkcB5CB0FSYXYx';

const Yelp = {
  search: (term, location, sortBy) => {
    console.log(term, location, sortBy)
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    })
      .then(response => { return response.json() })
      .then(jsonResponse => {
        console.log(jsonResponse)
        if (jsonResponse.businesses) {
          console.log('entre al if')
          const businesses = jsonResponse.businesses.map(business => {
            return {
              id: business.id,
              name: business.name,
              imageSrc: business.image_url,
              address: business.location.address1,
              city: business.location.city,
              state: business.location.state,
              zipCode: business.location.zip_code,
              category: business.categories[0].title,
              rating: business.rating,
              reviewCount: business.review_count
            }
          })
          console.log(businesses)
          return businesses
        }

      })

  }
}

export default Yelp;