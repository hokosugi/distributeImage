class PicturesController < ApplicationController
  before_action :set_picture, only: [:show, :edit, :update, :destroy]

  # GET /pictures
  # GET /pictures.json
  def index
    @picture = Picture.new
    
  end

  
 

  # GET /pictures/new
  def new
    @picture = Picture.new
    @index = params[:index_id]
  end

  # GET /pictures/1/edit
  def edit
  end

  # POST /pictures
  # POST /pictures.json
  def create
    @picture = Picture.new(picture_params)
    @picture.pic = params['picture']['pic']
    @picture.index_id = params['picture']['index_id']
    @picture.id = params['picture']['id']
    if @picture.save
      redirect_to indices_path, notice: '保存しました'
    else
      render :index
    end
    # respond_to do |format|
    #   if @picture.save!
        
    #     format.html { redirect_to @picture, notice: 'Picture was successfully created.' }
    #     format.json { render :show, status: :created, location: @picture }
    #   else
    #     format.html { render :new }
    #     format.json { render json: @picture.errors, status: :unprocessable_entity }
    #   end
    # end
    # データベースpicを要らない文字列を除外してデコード
    image_data = Base64.decode64(@picture.pic['data:image/jpeg;base64,'.length .. -1])
    # ダウンロード
    if Dir::exist?("#{Rails.root}/public/downloads/name_no#{@picture.index_id}")
      File.open("#{Rails.root}/public/downloads/name_no#{@picture.index_id}/#{@picture.index_id}_#{@picture.id}.jpeg", 'wb') do |f|
        f.write(image_data)
      end
    else
      Dir::mkdir("#{Rails.root}/public/downloads/name_no#{@picture.index_id}")
      File.open("#{Rails.root}/public/downloads/name_no#{@picture.index_id}/#{@picture.index_id}_#{@picture.id}.jpeg", 'wb') do |f|
        f.write(image_data)
      end
    end
  end

  # PATCH/PUT /pictures/1
  # PATCH/PUT /pictures/1.json
  def update
    respond_to do |format|
      if @picture.update(picture_params)
        format.html { redirect_to @picture, notice: 'Picture was successfully updated.' }
        format.json { render :show, status: :ok, location: @picture }
      else
        format.html { render :edit }
        format.json { render json: @picture.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /pictures/1
  # DELETE /pictures/1.json
  def destroy
    @picture.destroy
    respond_to do |format|
      format.html { redirect_to pictures_url, notice: 'Picture was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_picture
      @picture = Picture.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def picture_params
      params.require(:picture).permit(:pic, :index_id)
    end
end
