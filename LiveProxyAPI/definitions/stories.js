const definition = {
  loading: false,
  name: 'stories',
  keys: {
    singular: 'story',
    plural: 'stories',
  },
  payloadFormatter(story) {
    return {
      story,
    };
  },
};

export default definition;
