const definition = {
  loading: false,
  name: 'sentences',
  keys: {
    singular: 'sentence',
    plural: 'sentences',
  },
  parent: 'story',
  payloadFormatter(sentence) {
    const { story_id } = sentence;
    return {
      sentence,
      story_id,
    };
  },
};

export default definition;
