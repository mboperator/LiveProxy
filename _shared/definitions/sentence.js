const definition = {
  loading: false,
  name: 'sentences',
  keys: {
    singular: 'sentence',
    plural: 'sentences',
  },
  payloadFormatter(sentence) {
    const { story_id, ... rest } = sentence;
    return {
      sentence: rest,
      story_id,
    };
  },
};

export default definition;
