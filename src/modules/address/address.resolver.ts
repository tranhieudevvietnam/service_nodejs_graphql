export default {
  Query: {
    getProvince: async (root: any, args: any, context: any) => {
      return [{ id: "1", name: "Hà nội" }];
    },
    getDistrict: async (root: any, args: any, context: any) => {
      return [{ id: "1", name: "Quận 1" }];
    },
    getWard: async (root: any, args: any, context: any) => {
      return [{ id: "1", name: "Phường 1" }];
    },
  },
};
