const { Router } = require("express");
const request = require("request");
const {
  formatJSONResponse,
  formatJSONItemResponse,
  getBaseUrl,
} = require("../helpers");
const router = Router();

router.get("/items", async (req, res) => {
  const { q } = req.query;
  const urlRequest = {
    url: `${getBaseUrl()}/sites/MLA/search?q=${q}`,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };
  request.get(urlRequest, (err, body) => {
    try {
      if (err) {
        res.status(500).json(err);
      } else if (body.statusCode == 200) {
        const dataRes = formatJSONResponse(JSON.parse(body.body));
        res.status(200).json(dataRes);
      } else {
        res.status(body.statusCode).json(body.body);
      }
    } catch (err) {
      console.log("err", err);
      res.status(500).json(err);
    }
  });
});

router.get("/items/:id", (req, res) => {
  const { id } = req.params;
  var urlRequest = {
    url: `${getBaseUrl()}/items/${id}`,
  };
  request.get(urlRequest, (err, body) => {
    urlRequest = {
      url: `${getBaseUrl()}/items/${id}/description`,
    };
    request.get(urlRequest, (err2, body2) => {
      try {
        if (err || err2) {
          res.status(500).json(err);
        } else if (body.statusCode == 200 && body2.statusCode == 200) {
          const dataRes = formatJSONItemResponse({
            ...JSON.parse(body.body),
            ...JSON.parse(body2.body),
          });
          res.status(200).json(dataRes);
        } else {
          res.status(body.statusCode).json(JSON.parse(body.body));
        }
      } catch (err) {
        console.log("err", err);
        res.status(500).json(err);
      }
    });
  });
});

module.exports = router;
