
(function () {

	var viewEl = document.querySelector('.view'),
		gridEl = viewEl.querySelector('.grid'),
		items = [].slice.call(gridEl.querySelectorAll('.product')),
		basket;

	function CompareBasket() {
		this.el = document.querySelector('.compare-basket');
		this.compareCtrl = this.el.querySelector('.action--compare');
		this.compareWrapper = document.querySelector('.compare'),
			this.closeCompareCtrl = this.compareWrapper.querySelector('.action--close')

		this.itemsAllowed = 3;
		this.totalItems = 0;
		this.items = [];

		this.compareCtrl.addEventListener('click', this._compareItems.bind(this));
		var self = this;
		this.closeCompareCtrl.addEventListener('click', function () {
			classie.add(self.el, 'compare-basket--active');
			classie.remove(viewEl, 'view--compare');
		});
	}

	CompareBasket.prototype.add = function (item) {
		if (this.isFull()) {
			return false;
		}

		classie.add(item, 'product--selected');

		var preview = this._createItemPreview(item);
		this.el.insertBefore(preview, this.el.childNodes[0]);
		this.items.push(preview);

		this.totalItems++;
		if (this.isFull()) {
			classie.add(this.el, 'compare-basket--full');
		}

		classie.add(this.el, 'compare-basket--active');
	};

	CompareBasket.prototype._createItemPreview = function (item) {
		var self = this;

		var preview = document.createElement('div');
		preview.className = 'product-icon';
		preview.setAttribute('data-idx', items.indexOf(item));

		var removeCtrl = document.createElement('button');
		removeCtrl.className = 'action action--remove';
		removeCtrl.innerHTML = '<i class="fa fa-remove"></i><span class="action__text action__text--invisible">删除商品</span>';
		removeCtrl.addEventListener('click', function () {
			self.remove(item);
		});

		var productImageEl = item.querySelector('img.product__image').cloneNode(true);

		preview.appendChild(productImageEl);
		preview.appendChild(removeCtrl);

		var productInfo = item.querySelector('.product__info').innerHTML;
		preview.setAttribute('data-info', productInfo);

		return preview;
	};

	CompareBasket.prototype.remove = function (item) {
		classie.remove(this.el, 'compare-basket--full');
		classie.remove(item, 'product--selected');
		var preview = this.el.querySelector('[data-idx = "' + items.indexOf(item) + '"]');
		this.el.removeChild(preview);
		this.totalItems--;

		var indexRemove = this.items.indexOf(preview);
		this.items.splice(indexRemove, 1);

		if (this.totalItems === 0) {
			classie.remove(this.el, 'compare-basket--active');
		}

		var checkbox = item.querySelector('.action--compare-add > input[type = "checkbox"]');
		if (checkbox.checked) {
			checkbox.checked = false;
		}
	};

	CompareBasket.prototype._compareItems = function () {
		var self = this;

		[].slice.call(this.compareWrapper.querySelectorAll('div.compare__item')).forEach(function (item) {
			self.compareWrapper.removeChild(item);
		});

		for (var i = 0; i < this.totalItems; ++i) {
			var compareItemWrapper = document.createElement('div');
			compareItemWrapper.className = 'compare__item';

			var compareItemEffectEl = document.createElement('div');
			compareItemEffectEl.className = 'compare__effect';

			compareItemEffectEl.innerHTML = this.items[i].getAttribute('data-info');
			compareItemWrapper.appendChild(compareItemEffectEl);

			this.compareWrapper.insertBefore(compareItemWrapper, this.compareWrapper.childNodes[0]);
		}

		setTimeout(function () {
			classie.remove(self.el, 'compare-basket--active');
			classie.add(viewEl, 'view--compare');
		}, 25);
	};

	CompareBasket.prototype.isFull = function () {
		return this.totalItems === this.itemsAllowed;
	};

	function init() {
		basket = new CompareBasket();
		initEvents();
	}

	function initEvents() {
		items.forEach(function (item) {
			var checkbox = item.querySelector('.action--compare-add > input[type = "checkbox"]');
			checkbox.checked = false;
			checkbox.addEventListener('click', function (ev) {
				if (ev.target.checked) {
					if (basket.isFull()) {
						ev.preventDefault();
						return false;
					}
					basket.add(item);
				}
				else {
					basket.remove(item);
				}
			});
		});
	}

	init();


	// 读取本地存储的数据 
	function getDate() {
		var data = localStorage.getItem("datalist");
		if (data !== null) {
			// 本地存储里面的数据是字符串格式的 但是我们需要的是对象格式的
			return JSON.parse(data);
		} else {
			return [];
		}
	}
	// 保存本地存储数据
	function saveDate(data) {
		localStorage.setItem("datalist", JSON.stringify(data));
	}
	// 删除本地数据
	// 删除本地数据的函数  恢复原来的样式
	function removeData() {
		localStorage.removeItem('datalist')
	}

	// 页面刷新即可渲染
	load()
	function load() {
		// 读取本地存储的数据
		var data = getDate();
		// 遍历之前需要清空之前的元素
		$('.shop_cars').empty();
		// 遍历这个数据
		$.each(data, function (i, n) {
			if (i >= 10) {
				alert('已经添加到上限, 先去结算再买吧')
				return false
			} else {
				$('.shop_cars').append("<li><img src=" + n.shop_img + " alt=" + n.shop_title + " id=" + i + " /><i class='shop_remove'></i></li>")
				// 读取本地存储的数据
				var data = getDate();
				data.push({ id: i })
			}

		})
	}

	// 购物车
	$('.action--buy').click(function () {
		// 显示购物车中心
		$('.car_center').slideDown()
		// 1.点击按钮 获取当前商品信息 
		// 先读取本地存储原来的数据
		var local = getDate();
		var shop_img = $(this).siblings('.xc_img').attr('src')
		var shop_title = $(this).siblings('.xc_title').html()
		var shop_price = $(this).siblings('.xc_price').html()
		// 生成时间戳  作为本次商品的唯一id
		var timestamp = Date.parse(new Date());
		local.push({id:timestamp, shop_img: shop_img, shop_title: shop_title, shop_price: shop_price })
		// 2. 保存到本地存储
		saveDate(local);
		// 3.渲染数据到购物车中
		load()
	})

	//删除商品
	$('.shop_cars').on('click', '.shop_remove', function () {
		// 先获取本地存储
		var data = getDate();
		// 修改数据
		var index = $(this).siblings().attr("id");
		console.log(index);
		data.splice(index, 1)
		// // 保存到本地存储
		saveDate(data);
		// // 重新渲染页面
		load();
	})

	// 一键清空功能
	$('.jie_remove').click(function () {
		// 获取本地数据
		var data = getDate();
		// 清空本地存储
		removeData()
		// 渲染
		load()
		// 清空字样显示
		$('.jie_remove').html('已清空')
		// 购物车隐藏
		setTimeout(function () {
			$('.car_center').slideUp()
		}, 400)
		setTimeout(function(){
			$('.jie_remove').html('清空全部')
		},700)

	})

	// 结算跳转
	$('.settlement').click(function () {
		// 重定向到订单结算页面
		location.assign('/xc_cart.html')
	})

	// 货比三家功能关闭
	$('.compare_max').click(function(){
		$('.compare-basket').slideUp()
	})
	$('.action--compare-add').click(function(){
		$('.compare-basket').slideDown()
	})
})();