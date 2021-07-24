export default function uuid(): string {
   if (!Date.now) {
      Date.now = function now() {
         return new Date().getTime();
      };
   }
   var d = Date.now();
   var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
         var r = (d + Math.random() * 16) % 16 | 0;
         d = Math.floor(d / 16);
         return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
      }
   );
   return uuid;
}
