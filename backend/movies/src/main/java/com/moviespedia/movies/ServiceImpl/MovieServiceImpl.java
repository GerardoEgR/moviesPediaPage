package com.moviespedia.movies.ServiceImpl;

import com.moviespedia.movies.DTO.MediaRequestDTO;
import com.moviespedia.movies.DTO.SearchRequestDTO;
import com.moviespedia.movies.Service.MovieService;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class MovieServiceImpl implements MovieService {

    @Value("${api.token}")
    private String apiToken;

    @Override
    public String findAll(MediaRequestDTO requestMedia) {

        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
                .url("https://api.themoviedb.org/3/" + requestMedia.getMediaType() + "/" + requestMedia.getMediaCategory() + "?language=en-US&page=" + requestMedia.getPage())
                .get()
                .addHeader("accept", "application/json")
                .addHeader("Authorization", "Bearer " + apiToken)
                .build();

        try {
            Response response = client.newCall(request).execute();
            return response.body().string();
        } catch (IOException e) {
            e.printStackTrace();
            return "Error al obtener los datos solicitados";
        }
    }

    @Override
    public String findAllGenres(String mediaType) {

        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
                .url("https://api.themoviedb.org/3/genre/" + mediaType + "/list?language=en")
                .get()
                .addHeader("accept", "application/json")
                .addHeader("Authorization", "Bearer " + apiToken)
                .build();

        try {
            Response response = client.newCall(request).execute();
            return response.body().string();
        } catch (IOException e) {
            e.printStackTrace();
            return "Error al obtener los datos solicitados";
        }
    }

    @Override
    public String getDetails(Integer mediaId, String mediaType) {

        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
                .url("https://api.themoviedb.org/3/"+ mediaType + "/" + mediaId + "?language=en-US")
                .get()
                .addHeader("accept", "application/json")
                .addHeader("Authorization", "Bearer " + apiToken)
                .build();

        Request requestCast = new Request.Builder()
                .url("https://api.themoviedb.org/3/"+ mediaType + "/" + mediaId + "/credits?language=en-US")
                .get()
                .addHeader("accept", "application/json")
                .addHeader("Authorization", "Bearer " + apiToken)
                .build();

        try {
            Response responseCast = client.newCall(requestCast).execute();
            Response response = client.newCall(request).execute();
            String responseBodyCast = responseCast.body().string();
            String responseBody = response.body().string();
            String jsonResponse = "{\"cast\":" + responseBodyCast + ", \"details\":" + responseBody + "}";
            return  jsonResponse ;
        } catch (IOException e) {
            e.printStackTrace();
            return "Error al obtener los datos solicitados";
        }
    }

    @Override
    public String getVideos(Integer mediaId, String mediaType) {
        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
                .url("https://api.themoviedb.org/3/"+ mediaType + "/" + mediaId + "/videos?language=en-US")
                .get()
                .addHeader("accept", "application/json")
                .addHeader("Authorization", "Bearer " + apiToken)
                .build();


        try {
            Response response = client.newCall(request).execute();
            return response.body().string();
        } catch (IOException e) {
            e.printStackTrace();
            return "Error al obtener los datos solicitados";
        }
    }

    @Override
    public String searchByName(SearchRequestDTO requestSearch) {

        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
                .url("https://api.themoviedb.org/3/search/" + requestSearch.getMediaType() + "?query=" + requestSearch.getTitle() + "&include_adult=false&language=en-US&page=" + requestSearch.getPage())
                .get()
                .addHeader("accept", "application/json")
                .addHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDU2YTM2MGNhNGM4Yzg1ZjYyMDJjNzVhYWEyMTZjYiIsInN1YiI6IjYwMzdlZTE5Yjc2Y2JiMDAzZWNjZWU2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gCFKgJ2_USwvLN5E57U3sU-bdzLAjRoeXey-AwX7XTw")
                .build();

        try {
            Response response = client.newCall(request).execute();
            return response.body().string();
        } catch (IOException e) {
            e.printStackTrace();
            return "Error al obtener los datos solicitados";
        }
    }
}
