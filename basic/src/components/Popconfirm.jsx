import { defineComponent, ref, onMounted, onUnmounted } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      default: "确认操作？"
    },
    onConfirm: {
      type: Function,
      default: () => {}
    },
    onCancel: {
      type: Function,
      default: () => {}
    }
  },
  setup(props, { slots }) {
    const isVisible = ref(false);
    const popconfirmRef = ref(null);

    const show = () => {
      isVisible.value = true;
    };

    const hide = () => {
      isVisible.value = false;
    };

    const handleConfirm = () => {
      props.onConfirm();
      hide();
    };

    const handleCancel = () => {
      props.onCancel();
      hide();
    };

    const handleClickOutside = (event) => {
      if (popconfirmRef.value && !popconfirmRef.value.contains(event.target)) {
        hide();
      }
    };

    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    return () => (
      <div class="relative inline-block" ref={popconfirmRef}>
        <div onClick={(e) => { e.stopPropagation(); show(); }}>
          {slots.default?.()}
        </div>
        
        {isVisible.value && (
          <div 
            class="absolute z-10 mt-2 mr-2 top-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg"
            style={{ minWidth: '200px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div class="p-4">
              <p class="text-gray-700 text-sm mb-4">{props.title}</p>
              <div class="flex justify-end space-x-2">
                <button
                  onClick={handleCancel}
                  class="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleConfirm}
                  class="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  确定
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
});